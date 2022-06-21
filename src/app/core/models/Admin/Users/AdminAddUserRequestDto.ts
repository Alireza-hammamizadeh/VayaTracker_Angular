export class AdminAddUserRequestDto{
  constructor(
    public FirstName: string,
    public LastName: string,
    public Mobile: string,
    public Email: string,
    public Password: string,
    
  ) {}
}
  