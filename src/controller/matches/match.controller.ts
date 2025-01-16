import { Request, Response } from 'express';
import { LeagueOfLegendsApiWrapper } from '../../RiotGames/RGLoL';
import { RiotServer } from '../../RiotGames/types/constants';
import { MatchDto, SummonerRiotAccount } from '../../RiotGames/types';
import { MatchHelper } from '../../RiotGames/MatchHelper';

export class MatchController {
  public static async getMatchByID(req: Request, res: Response) {
    try {
      const matchID = req.params.id;
      const region = req.params.region as RiotServer;
      console.log({ matchID, region });
      //Hacer comprobaciones de que matchID exista... region sea enum...

      const LoLService = new LeagueOfLegendsApiWrapper({
        API_KEY: process.env.RIOT_GAMES_API_KEY!,
        server: region,
      });

      const match: MatchDto = await LoLService.getMatchByID(matchID);
      const particiantsData: SummonerRiotAccount[] = [];

      for (const participant of match.metadata.participants) {
        const summoner = await LoLService.getSummonerByPUUID(participant);
        const account = await LoLService.getAccountByPUUID(summoner.puuid);
        particiantsData.push({ riotAccount: account, summoner: summoner });
      }

      const basicDataFromParticipants =
        MatchHelper.getBasicDataFromParticipants(match.info.participants);
      res.status(200).json({
        message: 'OK',
        data: {
          basicDataFromParticipants,
          matchInfo: match.info,
          matchMetadata: match.metadata,
        },
        statusCode: 200,
      });
    } catch (error) {
      console.log('Internal server error...');
      res
        .status(500)
        .json({ message: 'Internal server error...', data: 'ERROR' });
    }
  }
}

export default new MatchController();
