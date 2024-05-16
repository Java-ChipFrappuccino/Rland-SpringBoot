package kr.co.rland.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.rland.web.entity.MenuLike;
import kr.co.rland.web.repository.MenuLikeRepository;

@Service
public class MenuLikeServiceImp implements MenuLikeService{

    @Autowired
    MenuLikeRepository repository;

    @Override
    public MenuLike add(MenuLike menuLike) {
        int result = repository.save(menuLike);
        return null;
    }

    @Override
    public String cancel(MenuLike menuLike) {
        repository.delete(menuLike);
        return null;
    }
    
}
