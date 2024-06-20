package kr.co.rland.web.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.repository.MenuRepository;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MenuServiceImp implements MenuService {

    @Autowired
    MenuRepository repository;

    @Override
    public List<MenuView> getList(Long memberId, Integer page) {
        return getList(memberId, page,null,null);
    }

    @Override
    public List<MenuView> getList(Long memberId, Integer page, Long categoryId) {
        return getList(memberId, page,categoryId,null);
    }
    
    @Override
    public List<MenuView> getList(Long memberId, Integer page, String query) {
        return getList(memberId, page,null,query);
    }
    
    public List<MenuView> getList(Long memberId, Integer page, Long categoryId, String query) {
        int size = 6;
        int offset = (page-1)*size;
        List<MenuView> list = repository.findAll(memberId,categoryId,query,offset,size);
        return list;
    }

    @Override
    public Menu getById(long id) {

        Menu menu = repository.findById(id);
        // Menu
        // .builder()
        // .id(874)
        // .korName("핫아이스초코")
        // .engName("HotIceChoco")
        // .price(4500)
        // .build();

        return menu;
    }

    @Override
    public int getCount() {
        return getCount(null,null);

    }

    @Override
    public int getCount(Long categoryId) {
        return getCount(categoryId,null);
    }

    @Override
    public int getCount(String query) {
        return getCount(null,query);
    }

    public int getCount(Long categoryId,String query) {
        int count = repository.getCount(categoryId,query);
        return count;
    }

    @Override
    public int add(Menu menu, List<String> filenames) {
        int affected = repository.save(menu);
        return affected;
    }

    @Override
    @Transactional
    public void test() {
        Menu menu = Menu.builder().id(1499L).korName("언커밋").build();
        repository.update(menu); // ----1
        menu.setId(1509L);
        menu.setKorName("김치볶음밥2000");
        repository.update(menu); // ----2
    }

    @Override
//    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void test2() {
        Menu m1 = repository.findById(1499L);
        System.out.println(m1);
        System.out.println("------------/test1--------------");
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        Menu m2 = repository.findById(1499L);
        System.out.println(m2);
        System.out.println("------------/test2--------------");
    }

    // @Override
    // public List<MenuView> getSearchList(String search) {

    //     List<MenuView>list = repository.findAllByName(search);
    //     return list;
    // }
    
}
