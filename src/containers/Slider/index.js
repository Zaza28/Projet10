import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1 
  // fait un tri sur les dates

  );
  const nextCard = () => {
    setTimeout(
      // condition si à la dernière carte on fait un -1 sinon on retourne a 0 +1 permet de ne pas dépasser la taille des focuse qui était à 3 //
      () => setIndex(index +1 < byDateDesc?.length || 0 ? index + 1 : 0),
      // problème avec length by date vient de focus qui vient du fichier json prend du temps pour récup exécute avant la récup le ? = si ca existe on éxécute le code 
      // si lenght est pas la utilise 0 
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // div problème au niveua de la clé trouvé dans la console clé pas dans le bon élément 
        // créer un new élément pour lui appliquer la clé clé enfant direct de la map
        <div  key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((test, radioIdx) => (
                <input
                  key={`${test.date}`}
                  type="radio"
                  name="radio-button"
                    // eslint-disable-next-line spaced-comment
                    //modifier l'index image et pas de la clé, on utilise test au lieu de event.id 
      
                  checked={index === radioIdx}
                  readOnly // les boutons suivent les élément pas cliquable avec Onchange//

              
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
