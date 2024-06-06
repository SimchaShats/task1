import { Cocktail } from "./services/cocktails.types";
import { FC } from "react";

type CocktailDetailsProps = {
  cocktail?: Cocktail;
};

const ignoreProps = ["idDrink", "dateModified"];

const CocktailDetails: FC<CocktailDetailsProps> = ({ cocktail }) => {
  return (
    <div className="details-grid">
      {Object.entries(cocktail ?? {})
        .filter(([key, value]) => value && !ignoreProps.includes(key))
        .map(([key, value]) => (
          <>
            <div>{key.slice(3)}:</div>
            <div>{value}</div>
          </>
        ))}
    </div>
  );
};

export default CocktailDetails;
