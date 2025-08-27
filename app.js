// Your app's JavaScript code goes here
console.log('App loaded successfully!');

// Example: Add some interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is ready!');
    
    // Add a simple click handler to the container
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('click', () => {
            console.log('Container clicked!');
        });
    }
});
