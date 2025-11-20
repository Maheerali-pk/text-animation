export interface ICollectionItem {
  id: string;
  name: string;
  image: string[];
  description: React.ReactNode;
}

export const collectionItems: ICollectionItem[] = [
  {
    id: "1",
    name: "̄_(ツ)_/ ̄ candle",
    image: [
      "/images/collection-item1.png",
      "/images/collection-item2.png",
      "/images/collection-item3.png",

      "/images/collection-item1.png",
      "/images/collection-item2.png",
      "/images/collection-item3.png",

      "/images/collection-item1.png",
      "/images/collection-item2.png",
      "/images/collection-item3.png",
    ],
    description: (
      <div>
        <div>misty forest oak scent;</div>
        <div>
          sardinia sand beigesoy wax‘5’ extruding from both sides, randomized
          hash pattern
        </div>
        <div>11.5 x 9 x 7 inch candle;</div>
        <div>7 lbs</div>
      </div>
    ),
  },
  {
    id: "2",
    name: "¯(ツ)/¯ 5oap bar",
    image: [
      "/images/collection-item1.png",
      "/images/collection-item2.png",
      "/images/collection-item3.png",
    ],
    description: (
      <div>
        <div>misty forest oak scent;</div>
        <div>
          sardinia sand beigesoy wax‘5’ extruding from both sides, randomized
          hash pattern
        </div>
        <div>11.5 x 9 x 7 inch candle;</div>
        <div>7 lbs</div>
      </div>
    ),
  },
  {
    id: "3",
    name: "oversized core tee",
    image: [
      "/images/collection-item1.png",
      "/images/collection-item2.png",
      "/images/collection-item3.png",
    ],
    description: (
      <div>
        <div>misty forest oak scent;</div>
        <div>
          sardinia sand beigesoy wax‘5’ extruding from both sides, randomized
          hash pattern
        </div>
        <div>11.5 x 9 x 7 inch candle;</div>
        <div>7 lbs</div>
      </div>
    ),
  },
];
