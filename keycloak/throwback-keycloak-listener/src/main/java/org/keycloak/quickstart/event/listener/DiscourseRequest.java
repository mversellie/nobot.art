package org.keycloak.quickstart.event.listener;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

import java.util.List;
import java.util.Map;
import java.util.UUID;


@Data
@Builder
@Jacksonized
public class DiscourseRequest {
   final String name = "unnamed";
   String email;
   final String password = UUID.randomUUID().toString();
   String username;
   final Boolean approved = true;
   final Boolean active = true;
   List<Map<String,String>> external_ids;
}
