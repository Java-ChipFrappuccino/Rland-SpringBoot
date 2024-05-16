package kr.co.rland.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;

@Mapper
public interface MenuRepository {

    // @Select("select * from menu") //인터페이스는 약속이 담겨있는곳인데 구현이 담겨있는 느낌이다,마이바티스에 종속된 느낌, 쿼리문이 길어지면 유지보수가 힘들다 쿼리문말고 코드보기가 좋지않음
    // List<MenuView> findAll(Long categoryId);
    // List<MenuView> findAllByName(String name);
    List<MenuView> findAll(Long memberId, Long categoryId, String query, int offset , int size);
    Menu findById(long id);
    int getCount(Long categoryId, String query);

    int save(Menu menu);
    int update(Menu menu);
    int delete(long id);

}
