
package org.keycloak.quickstart.event.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.keycloak.events.Event;
import org.keycloak.events.EventListenerProvider;
import org.keycloak.events.EventType;
import org.keycloak.events.admin.AdminEvent;
import org.keycloak.events.admin.OperationType;
import org.keycloak.events.admin.ResourceType;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.RealmProvider;
import org.keycloak.models.UserModel;


public class ThrowbackRegisterEventListenerProvider implements EventListenerProvider {

    private final KeycloakSession session;
    private final RealmProvider model;

    public ThrowbackRegisterEventListenerProvider(KeycloakSession session) {
        this.model = session.realms();
        this.session = session;
    }

    @Override
    public void onEvent(Event event) {
        if(event.getType().equals(EventType.REGISTER)){
            String userId = event.getUserId();
            String realmId = event.getRealmId();
            RealmModel realm = this.model.getRealm(realmId);
            UserModel user = this.session.users().getUserById(realm, userId);
            shipUserToNoBot(user);
        }
    }

    @Override
    public void onEvent(AdminEvent adminEvent, boolean includeRepresentation) {
        if (ResourceType.USER.equals(adminEvent.getResourceType())
                && OperationType.CREATE.equals(adminEvent.getOperationType())) {
            RealmModel realm = this.model.getRealm(adminEvent.getRealmId());
            UserModel user = this.session.users().getUserById(realm, adminEvent.getResourcePath().substring(6));
            shipUserToNoBot(user);
        }
    }

    private void shipUserToNoBot(UserModel userData) {
        try {
            HttpClient httpClient = HttpClientBuilder.create().build();
            NoBotUserPojo userDataToSend =
                    NoBotUserPojo.builder()
                            .userId(userData.getId())
                            .username(userData.getUsername())
                            .email(userData.getEmail())
                            .build();
            String throwbackApiLocation = System.getenv("NOBOT_API_URL");
            String registerUrl = throwbackApiLocation + "/users";
            System.out.println("Shipping to:" + registerUrl);
            HttpPost post = new HttpPost(registerUrl);
            String bodyToSend = new ObjectMapper().writeValueAsString(userDataToSend);
            StringEntity body = new StringEntity(bodyToSend);
            post.setEntity(body);
            post.addHeader("content-type", "application/json");
            HttpResponse res = httpClient.execute(post);
            System.out.println("response is: " + res.getEntity().getContent());
        }

        catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void close() {}
}
