package com.example.usareto1.Repository;

import com.example.usareto1.Model.User;
import com.example.usareto1.Repository.CRUD.UserCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.print.DocFlavor;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    @Autowired
    private UserCRUDRepository userCRUDRepository;

    public List<User> getAll(){
        return (List<User>) userCRUDRepository.findAll();
    }

    public Optional<User> getUser(int id){
        return userCRUDRepository.findById(id);
    }

    public User save(User user){
        return userCRUDRepository.save(user);
    }

    public Optional<User> findByEmail(String email){
        return userCRUDRepository.findByEmail(email);
    }
    public Optional<User> findByEmailAndPassword(String email, String password){
        return userCRUDRepository.findByEmailAndPassword(email, password);
    }

    public void delete(User user){
        userCRUDRepository.delete(user);
    }

}
