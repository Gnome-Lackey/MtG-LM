import { Player } from "models/Player";
import { MatchRecordMap, MatchRecord } from "models/Match";

export default class RankUtility {
  private calculatePoints = (record: MatchRecord): number => {
    if (!record) {
      return 0;
    }

    const playedMatchPointFactorA = record.playersPlayed.length * 0.75;

    return record.wins * 3 + playedMatchPointFactorA;
  };

  private calculateOmw = (omw: number, playerRecord: MatchRecord): number => {
    return this.calculatePoints(playerRecord) + omw;
  };

  sortByRank = (players: Player[], matchRecordMap: MatchRecordMap): Player[] => {
    return players.sort((playerA: Player, playerB: Player) => {
      const recordA = matchRecordMap[playerA.id];
      const recordB = matchRecordMap[playerB.id];

      if (!recordA && recordB) return 1;
      if (recordA && !recordB) return -1;
      if (!recordA && !recordB) return playerA.displayName > playerB.displayName ? 1 : -1;

      const recordAPoints = this.calculatePoints(recordA);
      const recordBPoints = this.calculatePoints(recordB);

      if (recordAPoints > recordBPoints) return -1;
      if (recordAPoints < recordBPoints) return 1;

      const omwPercentageA = recordA.playersPlayed.reduce((omw: number, playerId: string) => {
        return this.calculateOmw(omw, matchRecordMap[playerId]);
      }, 0);

      const omwPercentageB = recordB.playersPlayed.reduce((omw: number, playerId: string) => {
        return this.calculateOmw(omw, matchRecordMap[playerId]);
      }, 0);

      if (omwPercentageA > omwPercentageB) return -1;
      if (omwPercentageA < omwPercentageB) return 1;
    });
  };

  private generateRank = (
    index: number,
    points: number,
    players: Player[],
    matchRecords: MatchRecordMap
  ): string => {
    if (points === 0) {
      return "common";
    } else if (index === 0) {
      return "mythic";
    }

    const previousRank = matchRecords[players[index - 1].id].rank;

    if (previousRank === "mythic") {
      return "rare";
    } else if (previousRank === "rare") {
      return "uncommon";
    } else {
      return "common";
    }
  };

  populateRanks = (players: Player[], matchRecordMap: MatchRecordMap): MatchRecordMap => {
    return players.reduce((newMapping, player, index) => {
      const record = newMapping[player.id];

      if (!record) {
        return newMapping;
      }

      const currentRecordPoints = this.calculatePoints(record);
      const previousRecordWithSamePoints = players
        .slice(0, index)
        .find(
          (nextPlayer) => this.calculatePoints(newMapping[nextPlayer.id]) === currentRecordPoints
        );

      return {
        ...newMapping,
        [player.id]: {
          ...record,
          rank: previousRecordWithSamePoints
            ? newMapping[previousRecordWithSamePoints.id].rank
            : this.generateRank(index, currentRecordPoints, players, newMapping)
        }
      };
    }, matchRecordMap);
  };
}
