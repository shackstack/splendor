import baekokSvg from './baekok.svg';
import heugyoseokSvg from './heugyoseok.svg';
import bijaeSvg from './bijae.svg';
import hongokSvg from './hongok.svg';
import hwangokSvg from './hwangok.svg';
import giokSvg from './giok.svg';
import type { GemType } from '../../types/gems';

export const GEM_ICONS: Record<GemType, string> = {
  baekok: baekokSvg,
  heugyoseok: heugyoseokSvg,
  bijae: bijaeSvg,
  hongok: hongokSvg,
  hwangok: hwangokSvg,
  giok: giokSvg,
};
