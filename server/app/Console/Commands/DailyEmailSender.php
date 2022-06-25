<?php

namespace App\Console\Commands;

use App\Models\Email;
use App\Models\EmailSender;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class DailyEmailSender extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mailer:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This is a command for daily scheduled email senders';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $dailySenders = EmailSender::where('frequency', 'daily')->get();
        foreach($dailySenders as $dailySender){
            $emails = Email::where('list_id', $dailySender->list_id)->get();
            foreach($emails as $email){
                $user = User::find($dailySender->author_id);

                Mail::send("Mails.empty", ['view' => $dailySender->view], function($message) use ($dailySender, $email, $user) {
                    $message->to($email->email)
                    ->subject($dailySender->subject)
                    ->replyTo($dailySender->reply_email)
                    ->from($user->email, $user->full_name);
                });
            }            
        }
        return 0;
    }
}
