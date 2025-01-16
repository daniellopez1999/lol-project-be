import { BasicParticipantData, ParticipantDto } from './types';
import { ItemsHelper } from './ItemsHelper';
import { ChampionsHelper } from './ChampionsHelper';
export class MatchHelper {
  constructor() {}

  public static getBasicDataFromParticipants(
    participantsData: ParticipantDto[]
  ): BasicParticipantData[] {
    const participants: BasicParticipantData[] = participantsData.map(
      (participant) => {
        const items = ItemsHelper.getParticipantItems(participant);
        const itemsWithImages = ItemsHelper.getImagesFromItems(items);

        const championWithImage = {
          championName: participant.championName,
          championId: participant.championId,
          championImage:
            ChampionsHelper.getImageFromChampion(participant.championName) ||
            '',
        };
        console.log({ championWithImage });

        return {
          champion: championWithImage,
          assists: participant.assists,
          kills: participant.kills,
          deaths: participant.deaths,
          itemsPurchased: participant.itemsPurchased,
          puuid: participant.puuid,
          riotIdGameName: participant.riotIdGameName,
          items: itemsWithImages,
        };
      }
    );
    return participants;
  }
}
