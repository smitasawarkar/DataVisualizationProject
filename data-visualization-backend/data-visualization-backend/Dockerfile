FROM openjdk:17-jdk
ARG JAR_FILE=target/*.jar
ADD target/datavisualization.jar datavisualization.jar
ENTRYPOINT ["java","-jar","datavisualization.jar"]
EXPOSE 8080



-----------------------
FROM openjdk:17-jdk
RUN mvn install -DskipTests
ARG JAR_FILE=target/*.jar
ADD JAR_FILE datavisualization.jar
ENTRYPOINT ["java","-jar","datavisualization.jar"]
EXPOSE 8080