Copy

# Use official Nginx image to serve the frontend
FROM nginx:alpine
 
# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*
 
# Copy our frontend files into nginx's serve folder
COPY . /usr/share/nginx/html
 
# Expose port 80
EXPOSE 80