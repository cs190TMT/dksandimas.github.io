package project.controller.admin;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

public class InsertController extends Controller {

    @Override
    public Navigation run() throws Exception {
        return forward("insert.jsp");
    }
}
