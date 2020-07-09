import { Request } from 'express';


function permitRoles(req: Request): boolean {
  if (req.params.username === 'admin') {
    return false;
  }
  return true;
}
export default permitRoles;
