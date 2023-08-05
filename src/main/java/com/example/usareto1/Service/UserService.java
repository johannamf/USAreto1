package com.example.usareto1.Service;

import com.example.usareto1.Model.User;
import com.example.usareto1.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableMBeanExport;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAll(){
        return userRepository.getAll();
    }

    public Optional<User> getUser(int id){
        return userRepository.getUser(id);
    }
    public User save(User user){
        if(!emailExists(user.getEmail())){
            if(validAttributes(user)){
                return userRepository.save(user);
            }
        }
        return user;
    }

    public boolean emailExists(String email){
        Optional<User> usuarioEncontrado = userRepository.findByEmail(email);
        return usuarioEncontrado.isPresent();
    }

    public boolean validAttributes(User user){
        return (user.getEmail()!=null && user.getPassword()!=null && user.getName()!=null);
    }

    public User authUser(String email, String password){
        Optional<User> usuarioEncontrado = userRepository.findByEmailAndPassword(email, password);
        if (usuarioEncontrado.isPresent()){
            return usuarioEncontrado.get();
        }else{
            return new User(null, email, password, "NO DEFINIDO");
        }

    }
}
