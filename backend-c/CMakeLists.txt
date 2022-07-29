cmake_minimum_required(VERSION 3.19)

project(tracer VERSION 1.0)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_executable(tracer main.cc)
add_subdirectory(crow)

list(APPEND EXTRA_LIBS crow)
list(APPEND EXTRA_INCLUDES "${PROJECT_SOURCE_DIR}/crow")

target_link_libraries(Tutorial PUBLIC ${EXTRA_LIBS})
target_include_directories(tracer PUBLIC "${PROJECT_BINARY_DIR}")
