import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { INestApplication } from '@nestjs/common';
import { TrendingAssetDto } from '../dtos/trending-asset.dto';
import { AssetLogService } from '../asset-log.service';
import { CreateLogDto } from '../dtos/create-asset-log.dto';
import { AssetType } from '../../common/enums/asset-type';
import { Log } from '../entities/log.entity';
describe('Asset-Log testing', () => {
  let app: INestApplication;
  let baseUrl: string = '/asset-log';
  let trendingUrl: string = `${baseUrl}/trending`;
  let recentUrl: string = `${baseUrl}/recent`;
  let assetLogService: AssetLogService;
  let testUserId: number = 1234564897;
  let testAssetId: number = 55555555;

  beforeAll(async () => {
    try {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();

      assetLogService = await moduleFixture.resolve(AssetLogService);

      await app.init();
    } catch (e) {
      console.error(e);
    }
  });

  beforeEach(async () => {
    const createTestLog: CreateLogDto = {
      user_id: testUserId,
      asset_id: testAssetId,
      asset_type: AssetType.stock,
    };
    await assetLogService.create(createTestLog);
  });

  afterEach(async () => {
    await assetLogService.remove(testUserId, testAssetId);
  });

  test('GET /asset-log/trending -- Receiving a list of assets that are trending for the giving period', async () => {
    const url = `${trendingUrl}?period=day`;
    const res = await request(app.getHttpServer()).get(url).expect(200);

    const trendingAssets: TrendingAssetDto[] = res.body;

    expect(trendingAssets.length).toBeGreaterThan(0);

    const result: TrendingAssetDto = trendingAssets.filter(
      (asset) => asset.asset_id === testAssetId,
    )[0];

    expect(result).toBeDefined();
    expect(result.count).toEqual(1);
  });

  test('GET /asset-log/recent -- Receiving a list of logs for a given user', async () => {
    const url = `${recentUrl}?user_id=${testUserId}`;

    const res = await request(app.getHttpServer()).get(url).expect(200);

    const logs: Log[] = res.body;

    expect(logs.length).toBeGreaterThan(0);

    const result: Log = logs.filter((log) => log.asset_id === testAssetId)[0];

    expect(result).toBeDefined();
  });
});
