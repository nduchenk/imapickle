use std::time::Duration;

use axum::{
    extract::Request,
    middleware::{from_fn, Next},
    response::Response,
    routing::{get_service, Router},
};
use tower_http::services::ServeFile;

async fn log_request(request: Request, next: Next) -> Response {
    let uri = request
        .uri()
        .path_and_query()
        .map(|v| v.as_str())
        .unwrap_or("")
        .to_owned();

    println!("Incoming Request: {uri}");
    tokio::time::sleep(Duration::from_secs(5)).await;

    let response = next.run(request).await;
    println!("Outgoing Response: {uri}");

    response
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route(
            "/image/:number",
            get_service(ServeFile::new("../resources/pickle.webp")),
        )
        .layer(from_fn(log_request));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8888")
        .await
        .unwrap();

    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}
