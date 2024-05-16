package kr.co.rland.web.controller.admin;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.rland.web.config.security.WebUserDetails;
import kr.co.rland.web.entity.Category;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.service.CategoryService;
import kr.co.rland.web.service.MenuService;

@Controller("AdminMenuController") // 이름의 중복을 피하기 위해 ioc컨테이너에 담기는 이름을 직접 작성해줄수있다
@RequestMapping("admin/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("reg")
    public String reg() {

        return "admin/menu/reg";
    }

    @PostMapping("reg")
    public String reg(
            // @RequestParam("kor-name") String korName
            // , @RequestParam("eng-name") String engName
            // // , @RequestParam("img") MultipartFile imgFile
            // , @RequestParam("price") Integer price
            Menu menu, @RequestParam("img-file") List<MultipartFile> imgFiles, HttpServletRequest request

    ) // Principal principal 나중에 추가할것
            throws IllegalStateException, IOException {
        // Menu menu = Menu.builder()
        // .korName(korName)
        // .engName(engName)
        // .price(price)
        // // .img(imgFile.getOriginalFilename())
        // .build();

        List<String> filenames = new ArrayList<>();

        for (MultipartFile imgFile : imgFiles) {

            String fileName = "";

            if (imgFile != null && !imgFile.isEmpty()) {
                // 파일 저장

                fileName = imgFile.getOriginalFilename();
                System.out.println(fileName);

                String path = "/image/menu";
                String realPath = request.getServletContext().getRealPath(path);

                File pathFile = new File(realPath);

                if (!pathFile.exists()) {
                    pathFile.mkdirs();
                }

                File file = new File(realPath + File.separator + fileName); // File.separator or "//"
                imgFile.transferTo(file);

                // ==========================
                filenames.add(fileName);

                System.out.println(realPath);
            }
        }

        menu.setRegMemberId(2001L);
        menu.setCategoryId(1L);
        // menu.setImg(fileName);

        int affected = menuService.add(menu, filenames);

        System.out.println("x:==================");
        System.out.printf("imgFile:%s\n", imgFiles);
        System.out.printf("affected:%d\n", affected);

        System.out.println(menu);

        return "redirect:list";
    }

    @GetMapping("list")
    public String list(
            @RequestParam(name = "c", required = false) Long categoryId,
            @RequestParam(name = "s", required = false) String query,
            @RequestParam(name = "p", required = false, defaultValue = "1") Integer page,
            @AuthenticationPrincipal WebUserDetails userDetails,
            Model model) {

        Long memberId = null;
        if (userDetails != null) {
            memberId = userDetails.getId();
        }

        // List<MenuView> list = menuService.getList();
        List<MenuView> list = menuService.getList(memberId,page);
        int count = 0;
        count = menuService.getCount();

        if (categoryId != null) {
            list = menuService.getList(memberId,page, categoryId);
            count = menuService.getCount(categoryId);
        } else if (query != null) {
            list = menuService.getList(memberId,page, query);
            count = menuService.getCount(query);
        }
        // else {
        // list = menuService.getList();
        // }

        List<Category> category = categoryService.getList();

        model.addAttribute("list", list);
        model.addAttribute("category", category);
        model.addAttribute("count", count);

        return "admin/menu/list";
    }

    @GetMapping("detail")
    public String detail(@RequestParam("id") long id, Model model) {

        Menu menu = menuService.getById(id);
        model.addAttribute("menu", menu);
        return "admin/menu/detail";
    }
    // @GetMapping("search")
    // public String search(@RequestParam("s")String search, Model model) {
    // List<Category> category = categoryService.getList();
    // List<MenuView> list = menuService.getSearchList(search);
    // model.addAttribute("category",category);
    // model.addAttribute("list", list);

    // return "menu/list";

    // }

}
