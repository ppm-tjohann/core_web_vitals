<?php

namespace App\Events;

use App\Models\Domain;
use App\Models\Rating;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DomainRatingsUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Domain $domain;


    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Domain $domain)
    {
        $this->domain = $domain->loadMissing('rating');
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('domains');
    }

    public function broadcastAs()
    {
        return 'domain.rating.'.$this->domain->id;
    }

}
