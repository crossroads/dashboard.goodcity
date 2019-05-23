
const DRAFT = 'draft';
const SUBMITTED = 'submitted';
const PROCESSING = 'processing';
const SCHEDULED = 'awaiting_dispatch';
const DISPATCHING = 'dispatching';
const CLOSED = 'closed';
const CANCELLED = 'cancelled';

const ONLINE_ORDER = 'online_order';
const APPOINTMENT = 'appointment';

export const STATES = {
  DRAFT, SUBMITTED, PROCESSING,
  SCHEDULED, DISPATCHING, CLOSED,
  CANCELLED
};

export const TYPES = {
  ONLINE_ORDER, APPOINTMENT
};

export const ACTIVE_STATES = [
  SUBMITTED,
  PROCESSING,
  SCHEDULED,
  DISPATCHING
];

export const UNCONFIRMED_STATES = [
  PROCESSING
];