package com.task_3.restapi.itrello.services;

import com.task_3.restapi.itrello.entities.CardTasks;
import com.task_3.restapi.itrello.entities.Cards;

import java.util.List;
import java.util.Optional;

public interface CardService {

    Cards addCard(Cards card);
    List<Cards> getAllCards();
    Cards getCard(Long id);
    void deleteCard(Cards card);
    Cards saveCard(Cards card);
    List<Cards> getAllCardsByName(String name);


    CardTasks addCardTask(CardTasks cardTask);
    List<CardTasks> getAllCardTasks();
    CardTasks getCardTask(Long id);
    void deleteCardTask(CardTasks cardTask);
    CardTasks saveCardTask(CardTasks cardTask);
    List<CardTasks> findTasksByCard(Long card_id);
}
