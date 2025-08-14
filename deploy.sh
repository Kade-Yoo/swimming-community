#!/bin/bash

# Swimming Community Docker Deployment Script

set -e

echo "🚀 Starting Swimming Community deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Function to cleanup old containers and images
cleanup() {
    print_status "Cleaning up old containers and images..."
    
    # Stop and remove containers
    docker-compose down --remove-orphans 2>/dev/null || true
    
    # Remove old images
    docker image prune -f 2>/dev/null || true
    
    print_status "Cleanup completed."
}

# Function to build and start services
deploy() {
    print_status "Building and starting services..."
    
    # Build images
    docker-compose build --no-cache
    
    # Start services
    docker-compose up -d
    
    print_status "Services started successfully!"
}

# Function to check service health
check_health() {
    print_status "Checking service health..."
    
    # Wait for services to be ready
    sleep 10
    
    # Check PostgreSQL
    if docker-compose exec -T postgres pg_isready -U swimming_user -d swimming_community > /dev/null 2>&1; then
        print_status "✅ PostgreSQL is healthy"
    else
        print_warning "⚠️  PostgreSQL health check failed"
    fi
    
    # Check Redis
    if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
        print_status "✅ Redis is healthy"
    else
        print_warning "⚠️  Redis health check failed"
    fi
    
    # Check Backend
    if curl -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
        print_status "✅ Backend is healthy"
    else
        print_warning "⚠️  Backend health check failed"
    fi
    
    # Check Frontend
    if curl -f http://localhost/health > /dev/null 2>&1; then
        print_status "✅ Frontend is healthy"
    else
        print_warning "⚠️  Frontend health check failed"
    fi
}

# Function to show service status
show_status() {
    print_status "Service Status:"
    docker-compose ps
    
    echo ""
    print_status "Service URLs:"
    echo "  Frontend: http://localhost"
    echo "  Backend API: http://localhost:8080"
    echo "  PostgreSQL: localhost:5432"
    echo "  Redis: localhost:6379"
}

# Function to show logs
show_logs() {
    print_status "Showing recent logs..."
    docker-compose logs --tail=50
}

# Main script logic
case "${1:-deploy}" in
    "deploy")
        cleanup
        deploy
        check_health
        show_status
        ;;
    "start")
        docker-compose up -d
        show_status
        ;;
    "stop")
        docker-compose down
        print_status "Services stopped."
        ;;
    "restart")
        docker-compose restart
        print_status "Services restarted."
        ;;
    "logs")
        show_logs
        ;;
    "status")
        show_status
        ;;
    "cleanup")
        cleanup
        ;;
    "build")
        docker-compose build --no-cache
        print_status "Images built successfully."
        ;;
    *)
        echo "Usage: $0 {deploy|start|stop|restart|logs|status|cleanup|build}"
        echo ""
        echo "Commands:"
        echo "  deploy   - Full deployment (cleanup, build, start, health check)"
        echo "  start    - Start existing containers"
        echo "  stop     - Stop all containers"
        echo "  restart  - Restart all containers"
        echo "  logs     - Show recent logs"
        echo "  status   - Show service status"
        echo "  cleanup  - Clean up old containers and images"
        echo "  build    - Build images only"
        exit 1
        ;;
esac

print_status "Deployment script completed!"
