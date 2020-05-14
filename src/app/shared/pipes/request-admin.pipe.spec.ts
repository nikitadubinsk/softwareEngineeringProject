import { RequestAdminPipe } from './request-admin.pipe';

describe('RequestAdminPipe', () => {
  it('create an instance', () => {
    const pipe = new RequestAdminPipe();
    expect(pipe).toBeTruthy();
  });
});
