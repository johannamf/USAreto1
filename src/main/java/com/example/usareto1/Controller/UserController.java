package com.example.usareto1.Controller;

import com.example.usareto1.Model.User;
import com.example.usareto1.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User user){
        return userService.save(user);
    }

    @GetMapping("/all")
    public List<User> getAll(){
        return userService.getAll();
    }

    @GetMapping("/{email}")
    public boolean emailExists(@PathVariable String email){
       return userService.emailExists(email);
    }

    @GetMapping("/{email}/{password}")
    public User authUser(@PathVariable String email, @PathVariable String password){
        return userService.authUser(email, password);
    }


}
