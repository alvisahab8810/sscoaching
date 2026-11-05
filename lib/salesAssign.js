import SubAdmin from "@/models/SubAdmin";
import PopupForm from "@/models/PopupForm";
import SalesAssignState from "@/models/SalesAssignState";

/**
 * Lead rotation for the sales team.
 *
 * New leads go to one sales person until they have had a full batch (10 by
 * default), then the next person in line takes over. The line is every active
 * sales person in the order they were added, so a deactivated person is
 * simply skipped and picks up again when reactivated.
 */

const STATE_ID = "main";

export async function loadAssignState() {
  const found = await SalesAssignState.findById(STATE_ID).lean();
  if (found) return found;
  try {
    return (await SalesAssignState.create({ _id: STATE_ID })).toObject();
  } catch {
    // Another request created it first.
    return SalesAssignState.findById(STATE_ID).lean();
  }
}

// Active sales people in the fixed order the rotation walks them.
export function rotationMembers() {
  return SubAdmin.find({ isSales: true, status: "active" })
    .select("name createdAt")
    .sort({ createdAt: 1, _id: 1 })
    .lean();
}

/**
 * Who takes the next lead, and what the batch count becomes.
 *
 * When the current person has left the rotation (deactivated or deleted),
 * the turn moves to whoever was added after them, so the order is kept
 * rather than restarting from the top.
 */
async function pickTurn(state, members) {
  const size = state.batchSize || 10;
  const idx = members.findIndex((m) => String(m._id) === String(state.currentId));

  if (idx !== -1 && state.countInBatch < size) {
    return { person: members[idx], countInBatch: state.countInBatch + 1 };
  }

  let nextIdx = 0;
  if (idx !== -1) {
    nextIdx = (idx + 1) % members.length;
  } else if (state.currentId) {
    const gone = await SubAdmin.findById(state.currentId).select("createdAt").lean();
    if (gone) {
      const after = members.findIndex((m) => new Date(m.createdAt) > new Date(gone.createdAt));
      nextIdx = after === -1 ? 0 : after;
    }
  }

  return { person: members[nextIdx], countInBatch: 1 };
}

/**
 * The turn as the admin sees it: who is taking leads now, how far into their
 * batch they are, and who is next. Read-only.
 */
export async function describeRotation() {
  const [state, members] = await Promise.all([loadAssignState(), rotationMembers()]);
  const size = state.batchSize || 10;
  const idx = members.findIndex((m) => String(m._id) === String(state.currentId));

  let current = null;
  let next = null;
  if (members.length) {
    if (idx !== -1 && state.countInBatch < size) {
      current = { _id: members[idx]._id, name: members[idx].name, count: state.countInBatch };
      next = members[(idx + 1) % members.length];
    } else {
      // The batch is full, or nobody has taken a lead yet: the next lead
      // starts a fresh batch with whoever pickTurn would choose.
      const turn = await pickTurn(state, members);
      current = { _id: turn.person._id, name: turn.person.name, count: 0 };
      const at = members.findIndex((m) => String(m._id) === String(turn.person._id));
      next = members[(at + 1) % members.length];
    }
  }

  return {
    enabled: state.enabled,
    batchSize: size,
    members: members.length,
    current,
    next: next && members.length > 1 ? { _id: next._id, name: next.name } : null,
  };
}

/**
 * Hand one lead to whoever's turn it is. Never throws: a failure here must
 * not cost us the lead, which is already saved and stays visible to admins.
 */
export async function autoAssignLead(leadId) {
  try {
    for (let attempt = 0; attempt < 5; attempt++) {
      const state = await loadAssignState();
      if (!state.enabled) return null;

      const members = await rotationMembers();
      if (!members.length) return null;

      const turn = await pickTurn(state, members);

      // Only one of two simultaneous requests can win this write; the other
      // goes round again and reads the turn the winner left behind.
      const write = await SalesAssignState.updateOne(
        { _id: STATE_ID, version: state.version },
        { $set: { currentId: turn.person._id, countInBatch: turn.countInBatch }, $inc: { version: 1 } }
      );
      if (!write.modifiedCount) continue;

      await PopupForm.updateOne(
        { _id: leadId, assignedTo: null },
        { $set: { assignedTo: turn.person._id, assignedToName: turn.person.name, assignedAt: new Date() } }
      );
      return turn.person;
    }
  } catch (err) {
    console.error("[salesAssign] failed:", err.message);
  }
  return null;
}
