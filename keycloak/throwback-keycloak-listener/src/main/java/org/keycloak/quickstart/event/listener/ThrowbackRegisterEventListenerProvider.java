/*
 * Copyright 2016 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.keycloak.quickstart.event.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.collections4.map.SingletonMap;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
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


import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

/**
 * @author <a href="mailto:sthorger@redhat.com">Stian Thorgersen</a>
 */
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
            Integer discourseId = shipUserToDiscourse(user);
            shipUserToNoBot(user,discourseId);
        }
    }

    @Override
    public void onEvent(AdminEvent adminEvent, boolean includeRepresentation) {
        if (ResourceType.USER.equals(adminEvent.getResourceType())
                && OperationType.CREATE.equals(adminEvent.getOperationType())) {
            RealmModel realm = this.model.getRealm(adminEvent.getRealmId());
            UserModel user = this.session.users().getUserById(realm, adminEvent.getResourcePath().substring(6));
            Integer discourseId = shipUserToDiscourse(user);
            shipUserToNoBot(user,discourseId);
        }
    }

    private boolean shipUserToNoBot(UserModel userData,Integer discourseId) {
        HttpClient httpClient = HttpClientBuilder.create().build();
        boolean worked = true;

        try {
            NoBotUserPojo userDataToSend =
                    NoBotUserPojo.builder()
                            .userId(userData.getId())
                            .username(userData.getUsername())
                            .discourseId(discourseId)
                            .build();
            String throwbackApiLocation = System.getenv("NOBOT_API_URL");
            String registerUrl = throwbackApiLocation + "/users";
            HttpPost post = new HttpPost(registerUrl);
            String bodyToSend = new ObjectMapper().writeValueAsString(userDataToSend);
            StringEntity body = new StringEntity(bodyToSend);
            post.setEntity(body);
            post.addHeader("content-type", "application/json");
            httpClient.execute(post);
        }

        catch(Exception e){
            e.printStackTrace();
            worked = false;
        }

        return worked;
    }

    private Integer shipUserToDiscourse(UserModel userData) {
        HttpClient httpClient = HttpClientBuilder.create().build();
        Integer userId = -1;

        try {
            ObjectMapper mapper =  new ObjectMapper();
            DiscourseRequest userDataToSend = DiscourseRequest.builder()
                    .email(userData.getEmail())
                    .username(userData.getUsername())
                    .external_ids(List.of(new SingletonMap<>("keycloak", userData.getId())))
                    .build();
            String apiLocation = System.getenv("DISCOURSE_API_URL") + "/users.json";
            String apiKey = System.getenv("DISCOURSE_API_KEY");
            String apiUser = System.getenv("DISCOURSE_API_USER");
            System.out.println("connecting to discourse api on " + apiLocation +"\n");
            HttpPost post = new HttpPost(apiLocation);
            String bodyToSend = mapper.writeValueAsString(userDataToSend);
            StringEntity body = new StringEntity(bodyToSend);
            post.setEntity(body);
            post.addHeader("content-type", "application/json");
            System.out.println("Using key/user " + apiKey + " / " + apiUser);
            post.addHeader("Api-Key", apiKey);
            post.addHeader("Api-Username", apiUser);
            HttpResponse res = httpClient.execute(post);
            HttpEntity httpEntityResponse = res.getEntity();
            String encoding = res.getEntity()
                    .getContentEncoding().getName();
            System.out.println("Encoding is:" + encoding);
            String resAsString = IOUtils.toString(httpEntityResponse.getContent(), StandardCharsets.UTF_8);
            System.out.println(resAsString);
            DiscourseCreateUserResponse resAsObject = mapper.readValue(resAsString,DiscourseCreateUserResponse.class);
            return resAsObject.user_id;
        }

        catch(Exception e){
            e.printStackTrace();
            return -1;
        }
    }


    
    @Override
    public void close() {
    }

}
