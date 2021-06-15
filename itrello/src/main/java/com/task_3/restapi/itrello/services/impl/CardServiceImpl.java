package com.task_3.restapi.itrello.services.impl;

import com.task_3.restapi.itrello.entities.CardTasks;
import com.task_3.restapi.itrello.entities.Cards;
import com.task_3.restapi.itrello.repositories.CardRepository;
import com.task_3.restapi.itrello.repositories.CardTaskRepository;
import com.task_3.restapi.itrello.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private CardTaskRepository cardTaskRepository;

    @Override
    public List<Cards> getAllCards() {
        return cardRepository.findAll();
    }

    @Override
    public Cards getCard(Long id) {
        Optional<Cards> opt = cardRepository.findById(id);
        return opt.isPresent()?opt.get():null;
    }

    @Override
    public Cards addCard(Cards card) {
        return cardRepository.save(card);
    }

    @Override
    public Cards saveCard(Cards card) {
        return cardRepository.save(card);
    }

    @Override
    public void deleteCard(Cards card) {
        cardRepository.delete(card);
    }

    @Override
    public  List<Cards> getAllCardsByName(String name){
        return cardRepository.findAllByNameIsStartingWith(name);
    }





    @Override
    public List<CardTasks> getAllCardTasks() {
        return cardTaskRepository.findAll();
    }

    @Override
    public CardTasks getCardTask(Long id) {
        Optional<CardTasks> opt = cardTaskRepository.findById(id);
        return opt.isPresent()?opt.get():null;
    }

    @Override
    public CardTasks addCardTask(CardTasks cardTask) {
        return cardTaskRepository.save(cardTask);
    }

    @Override
    public CardTasks saveCardTask(CardTasks cardTask) {
        return cardTaskRepository.save(cardTask);
    }

    @Override
    public void deleteCardTask(CardTasks cardTask) {
        cardTaskRepository.delete(cardTask);
    }

    @Override
    public List<CardTasks> findTasksByCard(Long card_id) {

        return cardTaskRepository.findAllByCardId(card_id);
    }
}
