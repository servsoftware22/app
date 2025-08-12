import { createClient } from "@supabase/supabase-js";
import { canRunAPI } from "@/lib/supabase";

// Only create Supabase client if environment variables are available
const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }
  
  return createClient(supabaseUrl, serviceRoleKey);
};

export async function POST() {
  // Check if we can run this API route during build
  if (!canRunAPI()) {
    return Response.json(
      { error: "API not available during build" },
      { status: 503 }
    );
  }

  try {
    const supabase = createSupabaseClient();
    
    // If we can't create a Supabase client (e.g., during build), return an error
    if (!supabase) {
      return Response.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }

    const sampleBlog = {
      slug: "complete-guide-to-digital-transformation-for-service-businesses",
      title:
        "The Complete Guide to Digital Transformation for Service Businesses in 2024",
      html_content: `
        <h2>Introduction</h2>
        <p>The digital landscape is evolving at an unprecedented pace, and service businesses that fail to adapt risk being left behind. In this comprehensive guide, we'll explore how digital transformation can revolutionize your service business, from customer acquisition to operational efficiency.</p>
        
        <h2>What is Digital Transformation?</h2>
        <p>Digital transformation is more than just adopting new technology—it's a fundamental shift in how your business operates, delivers value to customers, and competes in the marketplace. For service businesses, this means:</p>
        
        <ul>
          <li>Moving from paper-based processes to digital workflows</li>
          <li>Implementing online booking and payment systems</li>
          <li>Leveraging data analytics for better decision-making</li>
          <li>Creating seamless customer experiences across all touchpoints</li>
        </ul>
        
        <h2>The Benefits of Going Digital</h2>
        <p>Service businesses that embrace digital transformation typically see:</p>
        
        <h3>1. Increased Efficiency</h3>
        <p>Automated processes reduce manual work and eliminate errors. For example, online booking systems can handle appointments 24/7 without human intervention.</p>
        
        <h3>2. Better Customer Experience</h3>
        <p>Modern customers expect convenience and speed. Digital tools allow you to meet these expectations while building stronger relationships.</p>
        
        <h3>3. Improved Data Insights</h3>
        <p>Digital systems provide valuable data about customer behavior, service performance, and business trends that can inform strategic decisions.</p>
        
        <h2>Key Technologies for Service Businesses</h2>
        
        <h3>Website and Online Presence</h3>
        <p>A professional website is your digital storefront. It should be:</p>
        <ul>
          <li>Mobile-responsive</li>
          <li>Fast-loading</li>
          <li>SEO-optimized</li>
          <li>Easy to navigate</li>
        </ul>
        
        <h3>Customer Relationship Management (CRM)</h3>
        <p>A good CRM system helps you:</p>
        <ul>
          <li>Track customer interactions</li>
          <li>Manage appointments and schedules</li>
          <li>Store customer preferences and history</li>
          <li>Automate follow-up communications</li>
        </ul>
        
        <h3>Online Booking and Scheduling</h3>
        <p>Modern customers expect to book services online. Your booking system should:</p>
        <ul>
          <li>Show real-time availability</li>
          <li>Allow instant confirmation</li>
          <li>Send automated reminders</li>
          <li>Integrate with your calendar</li>
        </ul>
        
        <h3>Payment Processing</h3>
        <p>Digital payments are essential for modern service businesses. Look for solutions that offer:</p>
        <ul>
          <li>Multiple payment methods</li>
          <li>Secure processing</li>
          <li>Automatic invoicing</li>
          <li>Recurring billing options</li>
        </ul>
        
        <h2>Implementation Strategy</h2>
        
        <h3>Phase 1: Foundation (Weeks 1-4)</h3>
        <ol>
          <li>Audit your current processes</li>
          <li>Identify pain points and opportunities</li>
          <li>Set clear goals and metrics</li>
          <li>Choose your technology stack</li>
        </ol>
        
        <h3>Phase 2: Core Systems (Weeks 5-12)</h3>
        <ol>
          <li>Implement website and online booking</li>
          <li>Set up CRM and customer database</li>
          <li>Configure payment processing</li>
          <li>Train your team on new systems</li>
        </ol>
        
        <h3>Phase 3: Optimization (Weeks 13-20)</h3>
        <ol>
          <li>Analyze performance data</li>
          <li>Refine processes based on insights</li>
          <li>Implement advanced features</li>
          <li>Scale successful initiatives</li>
        </ol>
        
        <h2>Common Challenges and Solutions</h2>
        
        <h3>Challenge: Resistance to Change</h3>
        <p><strong>Solution:</strong> Involve your team in the planning process and provide comprehensive training. Show them how digital tools will make their jobs easier.</p>
        
        <h3>Challenge: Technology Overwhelm</h3>
        <p><strong>Solution:</strong> Start with one system at a time. Master each tool before adding the next one to your stack.</p>
        
        <h3>Challenge: Data Security Concerns</h3>
        <p><strong>Solution:</strong> Choose reputable providers with strong security measures. Implement proper access controls and regular backups.</p>
        
        <h2>Measuring Success</h2>
        <p>Track these key metrics to measure your digital transformation success:</p>
        
        <ul>
          <li><strong>Customer Acquisition Cost:</strong> How much it costs to acquire a new customer</li>
          <li><strong>Customer Lifetime Value:</strong> Total revenue from a customer over time</li>
          <li><strong>Booking Conversion Rate:</strong> Percentage of website visitors who book services</li>
          <li><strong>Average Response Time:</strong> How quickly you respond to customer inquiries</li>
          <li><strong>Customer Satisfaction Score:</strong> How happy your customers are with your service</li>
        </ul>
        
        <h2>Future Trends to Watch</h2>
        
        <h3>Artificial Intelligence and Automation</h3>
        <p>AI-powered chatbots, automated scheduling, and predictive analytics will become standard features for service businesses.</p>
        
        <h3>Voice Search Optimization</h3>
        <p>As voice assistants become more popular, optimizing your content for voice search will be crucial.</p>
        
        <h3>Augmented Reality</h3>
        <p>AR could revolutionize how customers preview and book services, especially in industries like home improvement and beauty.</p>
        
        <h2>Conclusion</h2>
        <p>Digital transformation isn't just about adopting new technology—it's about fundamentally changing how your business operates to better serve your customers and compete in the modern marketplace. The businesses that embrace this change today will be the leaders of tomorrow.</p>
        
        <p>Remember, the goal isn't to implement every digital tool available, but to choose the right technologies that align with your business goals and customer needs. Start small, measure results, and scale what works.</p>
      `,
      excerpt:
        "Discover how digital transformation can revolutionize your service business, from customer acquisition to operational efficiency. Learn the key technologies, implementation strategies, and success metrics that matter most in 2024.",
      category: "Business Tips",
      author_name: "Sarah Chen",
      author_image_url:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      cover_image_url:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
      seo_title:
        "Complete Guide to Digital Transformation for Service Businesses in 2024",
      seo_description:
        "Learn how to transform your service business with digital tools, from online booking to CRM systems. Expert guide with implementation strategies and success metrics.",
      published_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("blogs")
      .insert([sampleBlog])
      .select();

    if (error) {
      console.error("Error inserting sample blog:", error);
      return Response.json(
        { error: "Failed to insert sample blog" },
        { status: 500 }
      );
    }

    return Response.json({ success: true, blog: data[0] });
  } catch (error) {
    console.error("Error in sample blog API:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
