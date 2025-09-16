import { Chat, Message } from '../types';
import { config } from '../config';
import { LocalStorage, generateId } from '../utils';

// Enhanced response data with sources and images
interface EnhancedResponse {
  content: string;
  sources: Array<{
    title: string;
    url: string;
    description: string;
  }>;
  images: Array<{
    title: string;
    description: string;
    url?: string;
  }>;
}

// Mock chat service for demo purposes
export class ChatService {
  // Curated responses for suggested questions with sources and images
  private static curatedResponses: Record<string, EnhancedResponse> = {
    "How can ERP help streamline our business processes?": {
      content: `ERP systems are powerful tools for streamlining business processes across your organization:

**1. Process Integration & Standardization**
• Unifies disparate business processes into a single, cohesive system
• Standardizes workflows across departments and locations
• Eliminates data silos and reduces manual data entry
• Creates consistent business rules and procedures organization-wide

**2. Real-Time Data & Visibility**
• Provides real-time visibility into all business operations
• Enables data-driven decision making with live dashboards
• Offers comprehensive reporting and analytics capabilities
• Ensures all departments work with the same accurate, up-to-date information

**3. Automation of Routine Tasks**
• Automates repetitive tasks like invoicing, purchase orders, and payroll
• Reduces human error and processing time
• Enables straight-through processing for many transactions
• Frees up staff to focus on strategic, value-added activities

**4. Improved Compliance & Control**
• Built-in compliance features for various regulations (SOX, FDA, etc.)
• Audit trails and version control for all transactions
• Automated approval workflows and segregation of duties
• Enhanced security and access controls

**5. Enhanced Collaboration**
• Facilitates cross-departmental collaboration with shared data
• Improves communication through integrated messaging and notifications
• Enables better coordination between sales, operations, and finance
• Supports mobile access for remote and field workers

**6. Cost Reduction & Efficiency**
• Reduces operational costs through process optimization
• Minimizes duplicate data entry and manual errors
• Optimizes inventory levels and reduces carrying costs
• Improves cash flow through better financial management

The result is a more agile, efficient organization that can respond quickly to market changes and customer demands.`,
      sources: [
        {
          title: "ERP Implementation Best Practices - SharePoint Document",
          url: "https://pcsoft.sharepoint.com/sites/documentation/ERP_Implementation_Guide.pdf",
          description: "Comprehensive guide on ERP implementation strategies and business process optimization"
        },
        {
          title: "Business Process Automation with ERP - Internal Knowledge Base",
          url: "https://pcsoft.sharepoint.com/sites/kb/Process_Automation_ERP.docx",
          description: "Internal documentation on automating business processes using ERP systems"
        },
        {
          title: "ROI Analysis: ERP Systems - Financial Reports",
          url: "https://pcsoft.sharepoint.com/sites/finance/ERP_ROI_Analysis_2024.xlsx",
          description: "Detailed ROI analysis and cost-benefit calculations for ERP implementations"
        }
      ],
      images: [
        {
          title: "ERP Process Flow Diagram",
          description: "Visual representation of integrated business processes in ERP"
        },
        {
          title: "Before/After: Process Optimization",
          description: "Comparison of business processes before and after ERP implementation"
        },
        {
          title: "ERP Dashboard Screenshot",
          description: "Real-time business intelligence dashboard from ERP system"
        }
      ]
    },

    "What are the key modules in a modern ERP system?": {
      content: `Modern ERP systems typically include these core modules, each designed to manage specific business functions:

**Financial Management Modules:**
• **General Ledger** - Core accounting and financial reporting
• **Accounts Payable/Receivable** - Vendor and customer payment processing
• **Fixed Asset Management** - Asset tracking and depreciation
• **Cash Management** - Cash flow forecasting and bank reconciliation
• **Financial Reporting** - Regulatory compliance and management reporting

**Supply Chain & Operations:**
• **Inventory Management** - Stock tracking, valuation, and optimization
• **Procurement** - Purchase requisitions, POs, and vendor management
• **Production Planning** - MRP, capacity planning, and scheduling
• **Quality Management** - Quality control and compliance tracking
• **Warehouse Management** - Picking, packing, and shipping operations

**Sales & Customer Management:**
• **Customer Relationship Management (CRM)** - Lead and opportunity tracking
• **Sales Order Management** - Quote-to-cash processes
• **Pricing Management** - Dynamic pricing and discount controls
• **Commission Management** - Sales compensation calculations

**Human Resources:**
• **HR Information System (HRIS)** - Employee records and self-service
• **Payroll Management** - Salary processing and tax compliance
• **Time & Attendance** - Time tracking and labor cost allocation
• **Talent Management** - Recruiting, performance, and learning management

**Project & Service Management:**
• **Project Accounting** - Project costing and profitability analysis
• **Resource Management** - Resource allocation and utilization
• **Service Management** - Field service and maintenance scheduling

**Business Intelligence & Analytics:**
• **Reporting & Dashboards** - Real-time KPIs and operational metrics
• **Data Warehousing** - Historical data storage and analysis
• **Advanced Analytics** - Predictive analytics and machine learning

**Modern Add-ons:**
• **Mobile Applications** - iOS/Android apps for field workers
• **IoT Integration** - Sensor data collection and analysis
• **AI/ML Capabilities** - Intelligent automation and insights
• **API Management** - Integration with third-party systems

The modular approach allows organizations to implement what they need now and expand functionality as they grow.`,
      sources: [
        {
          title: "ERP Module Configuration Guide - SharePoint",
          url: "https://pcsoft.sharepoint.com/sites/documentation/ERP_Modules_Guide.pdf",
          description: "Detailed documentation of ERP modules and their configurations"
        },
        {
          title: "Module Selection Criteria - Internal Wiki",
          url: "https://pcsoft.sharepoint.com/sites/wiki/Module_Selection_Framework.docx",
          description: "Framework for selecting appropriate ERP modules based on business needs"
        }
      ],
      images: [
        {
          title: "ERP Architecture Diagram",
          description: "Complete system architecture showing all integrated modules"
        },
        {
          title: "Module Integration Map",
          description: "Visual map of how different ERP modules connect and share data"
        }
      ]
    },

    "How to improve inventory management with ERP?": {
      content: `ERP systems transform inventory management through automation, real-time visibility, and intelligent optimization:

**1. Real-Time Inventory Tracking**
• Live inventory counts across all locations and warehouses
• Automatic updates when items are received, moved, or shipped
• Serial number and lot tracking for full traceability
• Integration with barcode scanners and RFID systems
• Multi-location inventory visibility in a single dashboard

**2. Automated Reorder Management**
• Set minimum and maximum stock levels for each item
• Automatic purchase requisition generation when stock hits reorder points
• Seasonal demand planning and safety stock calculations
• Supplier lead time management and delivery scheduling
• Economic Order Quantity (EOQ) optimization

**3. Advanced Demand Forecasting**
• Historical sales data analysis for demand patterns
• Seasonal trend identification and planning
• Integration with sales forecasts and marketing campaigns
• Machine learning algorithms for improved prediction accuracy
• What-if scenarios for demand planning

**4. Cost Management & Optimization**
• Multiple costing methods (FIFO, LIFO, Average, Standard)
• Landed cost calculations including freight and duties
• Inventory valuation reports for financial accuracy
• Slow-moving and obsolete inventory identification
• Carrying cost analysis and optimization recommendations

**5. Warehouse Operations Enhancement**
• Optimized picking routes and warehouse layouts
• Cycle counting programs with ABC analysis
• Put-away strategies for maximum efficiency
• Cross-docking capabilities for fast-moving items
• Integration with warehouse management systems (WMS)

**6. Quality Control Integration**
• Inspection workflows for incoming materials
• Quality holds and quarantine management
• Batch/lot tracking for quality issues and recalls
• Supplier quality ratings and performance tracking
• Certificate of analysis (COA) management

**7. Reporting & Analytics**
• Inventory turnover and aging reports
• Stock-out and overstock analysis
• Supplier performance dashboards
• Inventory accuracy metrics
• Cost variance analysis and reporting

**8. Mobile Capabilities**
• Mobile apps for warehouse staff
• Real-time inventory updates from the floor
• Mobile receiving and shipping confirmations
• Barcode scanning integration
• Remote inventory visibility for managers

**Benefits Achieved:**
• Reduced inventory carrying costs (typically 10-30% reduction)
• Improved inventory accuracy (95%+ accuracy achievable)
• Faster order fulfillment and reduced stockouts
• Better supplier relationships through improved planning
• Enhanced customer satisfaction with better availability

Successful ERP inventory management requires proper setup, staff training, and ongoing optimization based on performance metrics and changing business needs.`,
      sources: [
        {
          title: "Inventory Management Best Practices - SharePoint",
          url: "https://pcsoft.sharepoint.com/sites/operations/Inventory_Best_Practices.pdf",
          description: "Comprehensive guide to inventory management optimization using ERP"
        },
        {
          title: "Warehouse Integration Manual - SharePoint",
          url: "https://pcsoft.sharepoint.com/sites/documentation/Warehouse_ERP_Integration.docx",
          description: "Technical documentation for integrating warehouse operations with ERP"
        },
        {
          title: "Cost Reduction Case Studies - Internal Reports",
          url: "https://pcsoft.sharepoint.com/sites/finance/Inventory_Cost_Reduction_Cases.xlsx",
          description: "Real case studies showing inventory cost reductions achieved with ERP"
        }
      ],
      images: [
        {
          title: "Inventory Dashboard",
          description: "Real-time inventory levels and alerts dashboard"
        },
        {
          title: "Warehouse Layout Optimization",
          description: "Before and after warehouse layout improvements with ERP"
        },
        {
          title: "Mobile Inventory App Interface",
          description: "Screenshots of mobile inventory management application"
        }
      ]
    }
  };

  static async sendMessage(chatId: string, content: string): Promise<Message> {
    // Create the assistant message first
    const assistantMessage: Message = {
      id: generateId(),
      content: '',
      type: 'assistant',
      timestamp: new Date(),
      chatId,
      originalQuery: content, // Store the original user query
    };

    return assistantMessage;
  }

  static async *streamResponse(content: string): AsyncGenerator<string, void, unknown> {
    // Random thinking delay between 0-2 seconds to simulate AI processing
    const thinkingDelay = Math.random() * 2000; // 0 to 2000ms
    await new Promise(resolve => setTimeout(resolve, thinkingDelay));

    // Additional initial processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let responseContent: string;

    // Check if the content matches one of our curated responses
    if (this.curatedResponses[content]) {
      responseContent = this.curatedResponses[content].content;
    } else {
      // Default response for other queries
      responseContent = `Thanks for your query, your query is - "${content}"

I'm a demo AI assistant for the Lumo application. In a production environment, I would be connected to a real AI service like OpenAI GPT, Claude, or a custom AI model to provide intelligent responses to your questions.

Feel free to try one of the suggested questions above for a more detailed response, or continue our conversation with any other questions you might have!`;
    }

    // Stream the response word by word with realistic delays
    const words = responseContent.split(' ');
    let currentContent = '';

    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? ' ' : '') + words[i];
      yield currentContent;
      
      // Variable delay based on word length and punctuation for realistic feel
      let delay = 40; // Base delay
      
      if (words[i].endsWith('.') || words[i].endsWith('!') || words[i].endsWith('?')) {
        delay = 300; // Longer pause after sentences
      } else if (words[i].endsWith(',') || words[i].endsWith(':') || words[i].endsWith(';')) {
        delay = 150; // Medium pause after clauses
      } else if (words[i].startsWith('**') || words[i].endsWith('**')) {
        delay = 80; // Slightly longer for emphasis
      } else if (words[i].length > 8) {
        delay = 60; // Longer words take more time
      }
      
      // Add some randomness for more natural feel (±20ms)
      delay += Math.random() * 40 - 20;
      
      await new Promise(resolve => setTimeout(resolve, Math.max(20, delay)));
    }
  }

  static getResponseData(content: string): EnhancedResponse | null {
    return this.curatedResponses[content] || null;
  }

  static updateMessageContent(chatId: string, messageId: string, content: string): void {
    const chats = this.getChats();
    const chatIndex = chats.findIndex(chat => chat.id === chatId);
    
    if (chatIndex !== -1) {
      const messageIndex = chats[chatIndex].messages.findIndex(msg => msg.id === messageId);
      if (messageIndex !== -1) {
        chats[chatIndex].messages[messageIndex].content = content;
        chats[chatIndex].updatedAt = new Date();
        this.saveChats(chats);
      }
    }
  }

  static getChats(): Chat[] {
    try {
      const chatsStr = LocalStorage.getString(config.storage.chats);
      if (!chatsStr) return [];
      
      const chats = JSON.parse(chatsStr);
      // Convert string dates back to Date objects and sort by most recent
      return chats.map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      })).sort((a: Chat, b: Chat) => b.updatedAt.getTime() - a.updatedAt.getTime());
    } catch {
      return [];
    }
  }

  static saveChats(chats: Chat[]): void {
    LocalStorage.set(config.storage.chats, JSON.stringify(chats));
  }

  static createNewChat(userId: string): Chat {
    const newChat: Chat = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
    };

    const chats = this.getChats();
    chats.unshift(newChat);
    this.saveChats(chats);

    return newChat;
  }

  static updateChatTitle(chatId: string, firstMessage: string): void {
    const chats = this.getChats();
    const chatIndex = chats.findIndex(chat => chat.id === chatId);
    
    if (chatIndex !== -1) {
      // Generate title from first message (first 30 characters)
      const title = firstMessage.length > 30 
        ? firstMessage.substring(0, 30) + '...'
        : firstMessage;
      
      chats[chatIndex].title = title;
      chats[chatIndex].updatedAt = new Date();
      this.saveChats(chats);
    }
  }

  static addMessageToChat(chatId: string, message: Message): void {
    const chats = this.getChats();
    const chatIndex = chats.findIndex(chat => chat.id === chatId);
    
    if (chatIndex !== -1) {
      chats[chatIndex].messages.push(message);
      chats[chatIndex].updatedAt = new Date();
      this.saveChats(chats);
    }
  }

  static deleteChat(chatId: string): void {
    const chats = this.getChats().filter(chat => chat.id !== chatId);
    this.saveChats(chats);
  }

  static searchChats(query: string): Chat[] {
    const chats = this.getChats();
    const searchTerm = query.toLowerCase();
    
    return chats.filter(chat => 
      chat.title.toLowerCase().includes(searchTerm) ||
      chat.messages.some(message => 
        message.content.toLowerCase().includes(searchTerm)
      )
    );
  }
}
