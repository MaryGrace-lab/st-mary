// data/catechism/index.ts
// Central index for all catechism topics.
// Import each topic file and export a typed array.

import { title as t01, image as i01, items as items01 } from "./01-seven-sacraments";
import { title as t02, image as i02, items as items02 } from "./02-corporal-works-of-mercy";
import { title as t03, image as i03, items as items03 } from "./03-spiritual-works-of-mercy";
import { title as t04, image as i04, items as items04 } from "./04-eminent-good-works";
import { title as t05, image as i05, items as items05 } from "./05-gifts-of-the-holy-ghost";
import { title as t06, image as i06, items as items06 } from "./06-charismata";
import { title as t07, image as i07, items as items07 } from "./07-fruits-of-the-holy-ghost";
import { title as t08, image as i08, items as items08 } from "./08-theological-virtues";
import { title as t09, image as i09, items as items09 } from "./09-cardinal-virtues";
import { title as t10, image as i10, items as items10 } from "./10-capital-sins";
import { title as t11, image as i11, items as items11 } from "./11-sins-against-the-holy-ghost";
import { title as t12, image as i12, items as items12 } from "./12-sins-that-cry-out-to-heaven";
import { title as t13, image as i13, items as items13 } from "./13-conditions-for-mortal-sin";
import { title as t14, image as i14, items as items14 } from "./14-ways-we-participate-in-others-sins";
import { title as t15, image as i15, items as items15 } from "./15-the-10-commandments";
import { title as t16, image as i16, items as items16 } from "./16-the-2-greatest-commandments";
import { title as t17, image as i17, items as items17 } from "./17-the-3-evangelical-counsels";
import { title as t18, image as i18, items as items18 } from "./18-the-6-precepts-of-the-church";
import { title as t19, image as i19, items as items19 } from "./19-the-3-powers-of-the-soul";
import { title as t20, image as i20, items as items20 } from "./20-the-4-pillars-of-the-catholic-faith";
import { title as t21, image as i21, items as items21 } from "./21-the-3-pillars-of-the-churchs-authority";
import { title as t22, image as i22, items as items22 } from "./22-the-3-munera";
import { title as t23, image as i23, items as items23 } from "./23-the-3-parts-of-the-church";
import { title as t24, image as i24, items as items24 } from "./24-the-4-marks-of-the-church";
import { title as t25, image as i25, items as items25 } from "./25-the-12-tribes-of-israel";
import { title as t26, image as i26, items as items26 } from "./26-the-8-beatitudes";
import { title as t27, image as i27, items as items27 } from "./27-the-14-stations-of-the-cross";
import { title as t28, image as i28, items as items28 } from "./28-the-20-mysteries-of-the-holy-rosary";
import { title as t29, image as i29, items as items29 } from "./29-the-9-choirs-of-angels";
import { title as t30, image as i30, items as items30 } from "./30-the-3-levels-of-reverence";
import { title as t31, image as i31, items as items31 } from "./31-the-14-holy-helpers";
import { title as t32, image as i32, items as items32 } from "./32-the-7-last-words-of-christ";
import { title as t33, image as i33, items as items33 } from "./33-the-4-last-things";

export interface CatechismTopic {
  title: string;
  image: string;
  items: string[];
}

export const catechismTopics: CatechismTopic[] = [
  { title: t01, image: i01, items: items01 },
  { title: t02, image: i02, items: items02 },
  { title: t03, image: i03, items: items03 },
  { title: t04, image: i04, items: items04 },
  { title: t05, image: i05, items: items05 },
  { title: t06, image: i06, items: items06 },
  { title: t07, image: i07, items: items07 },
  { title: t08, image: i08, items: items08 },
  { title: t09, image: i09, items: items09 },
  { title: t10, image: i10, items: items10 },
  { title: t11, image: i11, items: items11 },
  { title: t12, image: i12, items: items12 },
  { title: t13, image: i13, items: items13 },
  { title: t14, image: i14, items: items14 },
  { title: t15, image: i15, items: items15 },
  { title: t16, image: i16, items: items16 },
  { title: t17, image: i17, items: items17 },
  { title: t18, image: i18, items: items18 },
  { title: t19, image: i19, items: items19 },
  { title: t20, image: i20, items: items20 },
  { title: t21, image: i21, items: items21 },
  { title: t22, image: i22, items: items22 },
  { title: t23, image: i23, items: items23 },
  { title: t24, image: i24, items: items24 },
  { title: t25, image: i25, items: items25 },
  { title: t26, image: i26, items: items26 },
  { title: t27, image: i27, items: items27 },
  { title: t28, image: i28, items: items28 },
  { title: t29, image: i29, items: items29 },
  { title: t30, image: i30, items: items30 },
  { title: t31, image: i31, items: items31 },
  { title: t32, image: i32, items: items32 },
  { title: t33, image: i33, items: items33 },
];