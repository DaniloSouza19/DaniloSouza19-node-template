import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IFindAllProviders from '@modules/users/dtos/IFindAllProvidersDTO';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ expect_user_id }: IFindAllProviders): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      expect_user_id,
    });

    return users;
  }
}

export default ListProvidersService;
