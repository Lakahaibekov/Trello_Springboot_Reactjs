package com.task_3.restapi.itrello.rest;

import com.task_3.restapi.itrello.dto.UserDTO;
import com.task_3.restapi.itrello.entities.CardTasks;
import com.task_3.restapi.itrello.entities.Cards;
import com.task_3.restapi.itrello.entities.Roles;
import com.task_3.restapi.itrello.entities.Users;
import com.task_3.restapi.itrello.repositories.RolesRepository;
import com.task_3.restapi.itrello.services.CardService;
import com.task_3.restapi.itrello.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class MainRestController {

    @Autowired
    private CardService cardService;

    @Autowired
    private UserService userService;

    @Autowired
    private RolesRepository rolesRepository;

    @GetMapping (value = "/allcards")
    public ResponseEntity<?> getAllCards(@Param(value = "searchString") String searchString){
        List<Cards> cards;
        System.out.println(searchString);
        if(searchString ==null || searchString=="") {
            cards = cardService.getAllCards();
        }else{
            cards = cardService.getAllCardsByName(searchString);
        }
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @PostMapping (value = "/addcard")
    public  ResponseEntity<?> addCard(@RequestBody Cards card){
        cardService.addCard(card);
        return ResponseEntity.ok(card);
    }

    @PutMapping(value = "/savecard")
    public ResponseEntity<?> saveCard(@RequestBody Cards card){
        cardService.saveCard(card);
        return ResponseEntity.ok(card);
    }

    @GetMapping (value = "/getcard/{id}")
    public ResponseEntity<?> getCard(@PathVariable(name = "id") Long id){
        Cards card = cardService.getCard(id);
        return ResponseEntity.ok(card);
    }


    @DeleteMapping(value = "/deletecard")
    public ResponseEntity<?> deleteCard(@RequestBody Cards card){
        Cards checkCard = cardService.getCard(card.getId());
        if(checkCard!=null){
            cardService.deleteCard(checkCard);
            return ResponseEntity.ok(checkCard);
        }
        return ResponseEntity.ok(card);
    }

    @GetMapping (value = "/gettasksbyid/{id}")
    public ResponseEntity<?> getCardTasksById(@PathVariable(name = "id") Long id){
        List<CardTasks> tasks = cardService.findTasksByCard(id);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping (value = "/addtask")
    public  ResponseEntity<?> addTask(@RequestBody CardTasks task){
        cardService.addCardTask(task);
        return ResponseEntity.ok(task);
    }

    @PutMapping(value = "/savetask")
    public ResponseEntity<?> saveTask(@RequestBody CardTasks task){
        cardService.saveCardTask(task);
        return ResponseEntity.ok(task);
    }

    @GetMapping (value = "/gettask/{id}")
    public ResponseEntity<?> getTask(@PathVariable(name = "id") Long id){
        CardTasks task = cardService.getCardTask(id);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping(value = "/deletetask")
    public ResponseEntity<?> deleteTask(@RequestBody CardTasks task){
        CardTasks checkTask = cardService.getCardTask(task.getId());
        if(checkTask!=null){
            cardService.deleteCardTask(checkTask);
            return ResponseEntity.ok(checkTask);
        }
        return ResponseEntity.ok(task);
    }


    ////////////////////////////////////////////////

    @PostMapping(value = "/registr")
    public ResponseEntity<?> registr(@RequestBody Users user) {
        System.out.println(user.getUsername());
        Users new_user =  userService.getUserByEmail(user.getUsername());
        if(new_user!=null){
            return ResponseEntity.notFound().build();
        }
        else{

            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            List<Roles> roles = new ArrayList<>();
            roles.add(rolesRepository.getOne(3L));
            user.setRoles(roles);
            userService.saveUser(user);
            return ResponseEntity.ok().build();

//                user = new Users();
//                user.setEmail(email);
//                BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//                user.setPassword(bCryptPasswordEncoder.encode(password));
//                user.setFullName(fullname);
//                List<Roles> roles = new ArrayList<>();
//                roles.add(rolesRepository.getOne(3L));
//                user.setRoles(roles);
//                userService.saveUser(user);
//                model.addAttribute("success","User registered successfully");

        }
    }



    @GetMapping(value = "/profile")
    public ResponseEntity<?> profilePage(){
        Users user = getUser();
        return new ResponseEntity<>(new UserDTO(user.getId(), user.getEmail(),user.getFullName(), user.getRoles()), HttpStatus.OK);
    }

    private Users getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            Users user = (Users) authentication.getPrincipal();
            return user;
        }
        return null;
    }


    @PutMapping(value = "/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody Users user){
        Users u =  userService.getUserByEmail(user.getUsername());
        if(u!=null){
            u.setFullName(user.getFullName());
            userService.saveUser(u);
            return ResponseEntity.ok(u);
        }
        return ResponseEntity.notFound().build();
    }




    @PutMapping(value = "/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody UserDTO user){
        Users u =  userService.getUserByEmail(user.getEmail());
        BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
        if(!bCrypt.matches(user.getPassword(),u.getPassword())){
            return ResponseEntity.notFound().build();
        }
        else{
            u.setPassword(bCrypt.encode(user.getNewPassword()));
            userService.saveUser(u);
            return ResponseEntity.ok(u);
        }




    }
}
