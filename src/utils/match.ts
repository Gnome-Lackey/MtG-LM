import { Player } from "models/Player";
import { MatchRecordMap, MatchRecord } from "models/Match";

export default class MatchUtility {
  calculatePoints(record: MatchRecord): number {
    if (!record) {
      return 0;
    }

    const playedMatchPointFactorA = record.playersPlayed.length * 0.75;

    return record.wins * 3 + playedMatchPointFactorA;
  }

  calculateOmw(omw: number, playerRecord: MatchRecord): number {
    return this.calculatePoints(playerRecord) + omw;
  }

  generateRanking(players: Player[], matchRecordMap: MatchRecordMap): Player[] {
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
  }
}
