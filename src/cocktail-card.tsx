import { Carousel, Card, Button, Modal } from "antd";
import { FC, useState } from "react";
import { Cocktail } from "./services/cocktails.types";
import { useLazyGetCocktailByIdQuery } from "./services/cocktails.service";
import CocktailDetails from "./cocktail-details";

type CocktailsCardProps = {
  cocktails?: Cocktail[];
};

const CocktailCard: FC<CocktailsCardProps> = ({ cocktails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [getCocktail, { data: cocktailById, isLoading }] =
    useLazyGetCocktailByIdQuery();

  const showModal = () => {
    if (cocktails) {
      getCocktail(cocktails[currentIndex].idDrink);
      setIsModalOpen(true);
    }
  };
  const hideModal = () => {
    setIsModalOpen(false);
    Modal.destroyAll();
  };

  return (
    <Card
      title="Cocktails"
      className="card"
      extra={
        <Button
          type="primary"
          onClick={showModal}
          disabled={!cocktails?.length}
        >
          Details
        </Button>
      }
    >
      <Carousel arrows infinite={false} afterChange={setCurrentIndex}>
        {cocktails?.map((drink) => (
          <img
            alt={drink.strDrink}
            key={drink.strDrink}
            src={drink.strDrinkThumb}
            className="thumb"
            height="240"
          />
        ))}
      </Carousel>
      <Modal
        closable={false}
        title="Details"
        open={isModalOpen}
        onClose={hideModal}
        loading={isLoading}
        footer={
          <Button type="primary" onClick={hideModal}>
            Close
          </Button>
        }
      >
        <CocktailDetails cocktail={cocktailById} />
      </Modal>
    </Card>
  );
};

export default CocktailCard;
