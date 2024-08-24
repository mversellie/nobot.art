package org.keycloak.quickstart.event.listener;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Data
@Builder
@Jacksonized
public class DiscourseCreateUserResponse {
    Boolean success;
    Boolean active;
    String message;
    Integer user_id;
}
