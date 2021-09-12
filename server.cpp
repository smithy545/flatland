#include <sys/socket.h>
#include <netinet/in.h>
#include <cstdlib>
#include <iostream>
#include <unistd.h>


int main() {
  int sockfd = socket(AF_INET, SOCK_STREAM, 0);
  if(sockfd == -1) {
    std::cerr << "Failed to create socket. errno: " << errno << std::endl;
    exit(EXIT_FAILURE);
  }

  sockaddr_in sockaddr;
  sockaddr.sin_family = AF_INET;
  sockaddr.sin_addr.s_addr = INADDR_ANY;
  sockaddr.sin_port = htons(80);
  if(bind(sockfd, (struct sockaddr*)&sockaddr, sizeof(sockaddr)) < 0) {
    std::cerr << "Failed to bind to port 80. errno: " << errno << std::endl;
    exit(EXIT_FAILURE);
  }

  if(listen(sockfd, 10) < 0) {
    std::cerr << "Failed to listen on socket. errno: " << errno << std::endl;
  }

  auto addrlen = sizeof(sockaddr);
  int connection = accept(sockfd, (struct sockaddr*)&sockaddr, (socklen_t*)&addrlen);
  if(connection < 0) {
    std::cerr << "Failed to grab connection. errno: " << errno << std::endl;
    exit(EXIT_FAILURE);
  }

  char buffer[100];
  auto read_bytes = read(connection, buffer, 100);
  std::cout << "Message: " << buffer;

  std::string response = "Test response\n";
  send(connection, response.c_str(), response.size(), 0);

  close(connection);
  close(sockfd);
}
