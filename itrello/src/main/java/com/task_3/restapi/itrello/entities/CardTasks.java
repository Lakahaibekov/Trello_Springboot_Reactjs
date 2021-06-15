package com.task_3.restapi.itrello.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "cardTasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardTasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "taskText")
    private String taskText;

    @Column(name = "addedDate")
    private Date addedDate;

    @Column(name = "done")
    private Boolean done;

    @ManyToOne(fetch = FetchType.EAGER)
    private Cards card;

}
