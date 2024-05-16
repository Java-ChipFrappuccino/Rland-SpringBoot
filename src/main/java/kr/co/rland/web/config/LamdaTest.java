package kr.co.rland.web.config;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import kr.co.rland.web.entity.Menu;

public class LamdaTest {
    public static void main(String[] args) {

        List<Menu> list = new ArrayList<>();

        list.add(Menu.builder().id(1).korName("1아하").build());
        list.add(Menu.builder().id(3).korName("3아하").build());
        list.add(Menu.builder().id(2).korName("2아하").build());
        list.add(Menu.builder().id(7).korName("7아하").build());
        list.add(Menu.builder().id(4).korName("4아하").build());
        // list.add(123);
        // list.add(31);
        // list.add(37);
        // list.add(13);

        // class AAA implements Comparator<Menu> {
        //     @Override
        //     public int compare(Menu o1, Menu o2) {
        //         return (int)(o1.getId() - o2.getId());
        //     }
        // }
        // AAA aaa = new AAA();
        // Comparator<Menu> aaa = new Comparator<Menu>(){  //익명 클래스 ,인터페이스를 상속받은 구현체를 이름없이 익명으로 바로쓸수있다
        //     @Override
        //     public int compare(Menu o1, Menu o2) {
        //         return (int)(o1.getId() - o2.getId());
        //     }
        // };
        // Comparator<Menu> aaa1 = (Menu o1, Menu o2)->{
        //     return (int)(o1.getId() - o2.getId());
        // };

        // Comparator<Menu> aaa2 = (Menu o1, Menu o2)->(int)(o1.getId() - o2.getId());

        System.out.println(list+"\n정렬 전");
        list.sort((o1, o2)->(int)(o1.getId() - o2.getId()));
        System.out.println(list+"\n정렬 후");

        // list.sort(aaa);

    }
}
