package kr.co.rland.web.socket.config;

import com.google.gson.Gson;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

public class ChatWebSocketHandler extends TextWebSocketHandler {

//    List<WebSocketSession> users = new ArrayList<>();
    List<WSUser> users = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        session.getPrincipal();
        WSUser user = new WSUser();

//        users.add(session);
//        System.out.println("접속됨 "+session.getRemoteAddress());
//        session.sendMessage(new TextMessage(session.getRemoteAddress() + " 가 접속하였습니다."));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String msg = message.getPayload();
        WSData data = new Gson().fromJson(msg, WSData.class);

        if (data.getType() == 1) { //새로운 사용자가 올 경우만 처리
            WSUser user = new WSUser();
            user.setSession(session);
            user.setUsername(data.getUserName());
            users.add(user);
            return;
        }

        // 사용자 메시지를 처리

        for (WSUser user : users) {
            String payload = message.getPayload();
            WSData sendData = new WSData();
            sendData.setType(2);
            sendData.setUserName(user.getUsername());
            sendData.setContent(payload);
            String textMessage = new Gson().toJson(sendData);

            user.getSession().sendMessage(new TextMessage(message.getPayload()));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//        users.remove(session);
        System.out.println("나감 "+session.getRemoteAddress());

    }
}
