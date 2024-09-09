FROM quay.io/keycloak/keycloak:25.0

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV PYTHONUNBUFFERED=1

COPY throwback-keycloak-listener/target/throwback-listener.jar /opt/keycloak/providers/nobot-register-listener.jar
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start", "--https-certificate-file=/ssl/cert.pem","--https-certificate-key-file=/ssl/key.pem"]