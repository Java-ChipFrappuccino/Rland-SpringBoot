package kr.co.rland.web.controller;

import java.util.List;

import org.springframework.ui.Model;

import kr.co.rland.web.entity.Category;
import kr.co.rland.web.service.CategoryService;

// @Controller
// @RequestMapping("menu")
public class CategoryController {

    // @Autowired
    private CategoryService service;

    // @GetMapping
    public String list(Model model) {
        List<Category>list = service.getList();
        model.addAttribute("category", list);
        return "list";
    }
}
