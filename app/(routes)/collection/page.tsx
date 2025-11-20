"use client";
import CharactersWithAnimation from "@/app/components/CharactersWithAnimation";
import CollectionItem from "@/app/components/CollectionItem";
import { collectionItems } from "@/app/helpers/data";

interface CollecionPageProps {}

const CollecionPage: React.FC<CollecionPageProps> = () => {
  return (
    <div className="grid grid-cols-[10rem_auto] h-full w-full gap-20">
      <div className="flex flex-col gap-40 ">
        <div></div>
        <CharactersWithAnimation
          characters={["C", "O", "L", "L", "E", "C", "T", "I", "O", "N"]}
          startAnimation={true}
        ></CharactersWithAnimation>
      </div>
      <div className="flex flex-col gap-32 pt-3">
        <div className="w-full h-full flex flex-col gap-5 text-sm">
          <div>COLLECTION Items</div>
          <div className="flex flex-col gap-3 w-fit">
            {collectionItems.map((item, index: number) => (
              <div
                key={item.id}
                className="grid grid-cols-[auto_auto_auto] items-center gap-3 w-fit"
              >
                <div>{index + 1}</div>
                <div>●</div>
                <div className="text-center">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
          <div className="flex gap-20 h-full w-fit"></div>
          <div className="flex flex-col gap-36">
            {collectionItems.map((item, index: number) => (
              <CollectionItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollecionPage;
