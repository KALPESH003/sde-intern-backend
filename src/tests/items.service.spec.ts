import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../items/item.entity';
import { ItemsService } from '../items/item.service';

const itemArray = [{ id: '1', title: 'a', description: 'd', isActive: true }];

describe('ItemsService', () => {
  let service: ItemsService;
  let repo: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: {
            find: jest.fn().mockResolvedValue(itemArray),
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockImplementation(item => Promise.resolve({ id: '1', ...item })),
            findOne: jest.fn().mockResolvedValue(itemArray[0]),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repo = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it('should return array of items', async () => {
    const items = await service.findAll();
    expect(items).toEqual(itemArray);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should create item', async () => {
    const dto = { title: 'test' };
    const created = await service.create(dto as any);
    expect(created).toHaveProperty('id');
  });

  it('should find one', async () => {
    const item = await service.findOne('1');
    expect(item).toEqual(itemArray[0]);
  });
});
