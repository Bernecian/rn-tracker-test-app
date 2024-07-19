import { IOption } from '@/types/app.types';

export const services: IOption[] = [
  { label: 'Grease Trap Service', value: 'grease_trap_service' },
  { label: 'Kitchen Hood Service', value: 'kitchen_hood_service' },
  { label: 'Grease Trap & Kitchen Hood Service', value: 'grease_trap_kitchen_hood_service' },
];

export const jobStatuses: IOption[] = [
  { label: 'Complete - No Issues', value: 'complete_no_issues' },
  { label: 'Complete - Needs Service', value: 'complete_needs_service' },
  { label: 'Complete - Needs Repair', value: 'complete_needs_repair' },
  { label: 'Could not Finish', value: 'could_not_finish' },
  { label: 'Access Unavailable', value: 'access_unavailable' },
];

export const comments: IOption[] = [
  { label: 'Call Dispatch', value: 'call_dispatch' },
  { label: 'Need to Call Customer', value: 'need_to_call_customer' },
  { label: 'No Issues', value: 'no_issues' },
  { label: 'No Comments', value: 'no_comments' },
];

export const activities: IOption[] = [
  { label: 'On Arrival', value: 'on_arrival' },
  { label: 'On Completion', value: 'on_completion' },
];
