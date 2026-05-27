import baekokArt from './card-art-baekok.svg';
import heugyoseokArt from './card-art-heugyoseok.svg';
import bijaeArt from './card-art-bijae.svg';
import hongokArt from './card-art-hongok.svg';
import hwangokArt from './card-art-hwangok.svg';
import type { RegularGemType } from '../../types/gems';

export const CARD_ART: Record<RegularGemType, string> = {
  baekok:     baekokArt,
  heugyoseok: heugyoseokArt,
  bijae:      bijaeArt,
  hongok:     hongokArt,
  hwangok:    hwangokArt,
};
