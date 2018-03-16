FROM ruby:2.3.3
RUN mkdir /TaskFellow
WORKDIR /TaskFellow
COPY Gemfile /TaskFellow/Gemfile
COPY Gemfile.lock /TaskFellow/Gemfile.lock
RUN bundle install
